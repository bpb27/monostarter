import * as apigatewayv2 from "@aws-cdk/aws-apigatewayv2-alpha";
import * as apigatewayv2_integrations from "@aws-cdk/aws-apigatewayv2-integrations-alpha";
import * as cdk from "aws-cdk-lib";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as ecr from "aws-cdk-lib/aws-ecr";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as ecsPatterns from "aws-cdk-lib/aws-ecs-patterns";
import * as iam from "aws-cdk-lib/aws-iam";
import * as logs from "aws-cdk-lib/aws-logs";
import * as s3 from "aws-cdk-lib/aws-s3";
import type { Construct } from "constructs";

export class AppStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

		// Create VPC for the BFF service
		const vpc = new ec2.Vpc(this, "AppVPC", {
			maxAzs: 2,
			natGateways: 1,
		});

		// Create ECR repository for the BFF
		const bffRepository = new ecr.Repository(this, "BffRepository", {
			repositoryName: "monostarter-bff",
			removalPolicy: cdk.RemovalPolicy.DESTROY,
			autoDeleteImages: true,
		});

		// Create ECS cluster
		const cluster = new ecs.Cluster(this, "AppCluster", {
			vpc,
			containerInsights: true,
		});

		// Create Fargate service
		const bffService = new ecsPatterns.ApplicationLoadBalancedFargateService(this, "BffService", {
			cluster,
			memoryLimitMiB: 512,
			desiredCount: 1,
			cpu: 256,
			taskImageOptions: {
				image: ecs.ContainerImage.fromEcrRepository(bffRepository),
				environment: {
					NODE_ENV: "production",
					PORT: "3000",
					NODE_VERSION: "22"
				},
				logDriver: ecs.LogDrivers.awsLogs({
					streamPrefix: "bff",
					logRetention: logs.RetentionDays.ONE_WEEK,
				}),
			},
			publicLoadBalancer: true,
		});

		// Add auto-scaling
		const scaling = bffService.service.autoScaleTaskCount({
			maxCapacity: 4,
			minCapacity: 1,
		});

		scaling.scaleOnCpuUtilization("CpuScaling", {
			targetUtilizationPercent: 70,
		});

		// Create HTTP API Gateway
		const httpApi = new apigatewayv2.HttpApi(this, "BffApi", {
			corsPreflight: {
				allowHeaders: ["Content-Type", "Authorization"],
				allowMethods: [apigatewayv2.CorsHttpMethod.ANY],
				allowOrigins: ["*"],
				maxAge: cdk.Duration.days(1),
			},
		});

		// Integrate API Gateway with the ALB
		const vpcLink = new apigatewayv2.VpcLink(this, "VpcLink", {
			vpc,
		});

		const integration = new apigatewayv2_integrations.HttpAlbIntegration("AlbIntegration", bffService.listener, {
			vpcLink,
		});

		httpApi.addRoutes({
			path: "/{proxy+}",
			methods: [apigatewayv2.HttpMethod.ANY],
			integration,
		});

		// Output the API Gateway URL
		new cdk.CfnOutput(this, "ApiUrl", {
			value: httpApi.url ?? "undefined",
		});

		// Output the ECR repository URI
		new cdk.CfnOutput(this, "BffRepositoryUri", {
			value: bffRepository.repositoryUri,
		});

		// Create an S3 bucket for hosting the web app
		const bucket = new s3.Bucket(this, "WebAppBucket", {
			bucketName: `${this.account}-${this.region}-monostarter-app`,
			removalPolicy: cdk.RemovalPolicy.DESTROY,
			autoDeleteObjects: true,
			websiteIndexDocument: "index.html",
			websiteErrorDocument: "index.html",
			publicReadAccess: false,
		});

		// Create CloudFront distribution
		const distribution = new cloudfront.Distribution(this, "WebAppDistribution", {
			defaultBehavior: {
				origin: new origins.S3Origin(bucket),
				viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
			},
			defaultRootObject: "index.html",
			errorResponses: [
				{
					httpStatus: 404,
					responseHttpStatus: 200,
					responsePagePath: "/index.html",
				},
			],
		});

		// Output the CloudFront URL
		new cdk.CfnOutput(this, "DistributionUrl", {
			value: `https://${distribution.distributionDomainName}`,
		});
	}
}
