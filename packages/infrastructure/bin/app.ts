#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { AppStack } from "../lib/app-stack";
import { GitHubActionsStack } from "../lib/github-actions-stack";

const app = new cdk.App();

// Deploy GitHub Actions role first
new GitHubActionsStack(app, "MonostarterGitHubActionsStack", {
	env: {
		account: process.env.CDK_DEFAULT_ACCOUNT,
		region: process.env.CDK_DEFAULT_REGION || "us-west-2",
	},
});

// Then deploy the main app stack
new AppStack(app, "MonostarterAppStack", {
	env: {
		account: process.env.CDK_DEFAULT_ACCOUNT,
		region: process.env.CDK_DEFAULT_REGION || "us-west-2",
	},
});
