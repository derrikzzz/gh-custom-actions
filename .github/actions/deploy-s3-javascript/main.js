//javascript action that will deploy code produced by build step to s3 bucket

const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');

function run() {
    // Get some input values, need some information about the deployment target; want to build actions that are reusable
    const bucket = core.getInput('bucket', { required: true });
    const bucketRegion = core.getInput('bucket-region', { required: true }); //value will be needed
    const distFolder = core.getInput('dist-folder', { required: true }); 

    //use these values to target the s3 bucket and send dist files to it
    //uplaod files

    //github.getOctokit() -> tool provided by github, easier to send requests to the github rest api
    //github.context -> object that contains information about the github event that triggered the workflow
    
    //the aws cli is preinstalled in the ubuntu images, so we can use it to upload files to s3, allows us to send commands to AWS account
    const s3Uri = `s3://${bucket}`; //inject bucket using backticks and ${}
    exec.exec(`aws s3 sync ${distFolder} ${s3Uri} --region ${bucketRegion}`); //sync command to upload files to s3 bucket
    //tells aws cli which local folder should be synchronised with remote s3 bucket, can be executed in regular shell of runner as well

    core.notice('Deploying to S3'); //log a message to github actions workflow log

    //dynamically generate URL of website hosted in s3 bucket (generate output)
    const websiteUrl = `https://${bucket}.s3.${bucketRegion}.amazonaws.com`;
    core.setOutput('website-url', websiteUrl); //output to be used in other steps of the workflow
}
run();

//javascript packages to use in actions are available in the github actions toolkit, can be used to interact with github actions environment