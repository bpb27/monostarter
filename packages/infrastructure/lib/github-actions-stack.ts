import * as cdk from "aws-cdk-lib";
import * as iam from "aws-cdk-lib/aws-iam";
import type { Construct } from "constructs";

export class GitHubActionsStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

		// Create a new role with a unique name
		const role = new iam.Role(this, "GitHubActionsRole", {
			roleName: "MonostarterGitHubActionsRole",
			assumedBy: new iam.WebIdentityPrincipal("arn:aws:iam::559792203405:oidc-provider/token.actions.githubusercontent.com", {
				StringEquals: {
					"token.actions.githubusercontent.com:aud": "sts.amazonaws.com",
					"token.actions.githubusercontent.com:sub": "repo:bpb27/monostarter:ref:refs/heads/main",
				},
			}),
		});

		// Add required permissions for CDK deployment
		role.addToPolicy(
			new iam.PolicyStatement({
				effect: iam.Effect.ALLOW,
				actions: [
					"ssm:GetParameter",
					"cloudformation:*",
					"s3:*",
					"iam:*",
					"ecr:*",
					"lambda:*",
					"apigateway:*",
					"cloudfront:*",
					"route53:*",
					"ec2:*",
					"ecs:*",
					"logs:*",
					"elasticloadbalancing:*",
				],
				resources: ["*"],
			}),
		);

		// Output the role ARN
		new cdk.CfnOutput(this, "RoleArn", {
			value: role.roleArn,
			description: "ARN of the GitHub Actions role",
		});
	}
}
