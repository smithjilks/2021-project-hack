# Software Challenge 2021

Here is a challenge to help you get acquainted with the [JKUAT SES Development board](https://github.com/JKUATSES/sesBoardv1) with the software development arena.

### This challenge is due at 1845hr EAT on 14th October 2021

## Rules

Your submission will be reviewed by the whole JKUAT SES Project members present during the meeting on 14th October 2021. We will consider your experience level when reviewing.

We value quality over completeness. If you decide to leave things out, please call attention to it in your project's `README` .

Our assessment covers the following areas:

*   A correct fork, branch and pull request.
*   We will use GitHub timestamp
*   The software application should cover the [12 factors](https://12factor.net/) application design protocols. Namely:

    - Codebase - One codebase tracked in revision control, many deploys

    - Dependencies - Explicitly declare and isolate dependencies

    - Config - Store config in the environment

    - Backing services - Treat backing services as attached resources

    - Build, release, run - Strictly separate build and run stages

    - Processes - Execute the app as one or more stateless processes

    - Port binding - Export services via port binding

    - Concurrency - Scale out via the process model

    - Disposability - Maximize robustness with fast startup and graceful shutdown

    - Dev/prod parity - Keep development, staging, and production as similar as possible

    - Logs - Treat logs as event streams

    - Admin processes - Run admin/management tasks as one-off processes

## Functional spec

The software application should work on the demo day.

## Task

Make sure your application includes:

* [ ] Codebase

* [ ] Dependencies

* [ ] Config

* [ ] Backing services

* [ ] Build, release, run

* [ ] Processes

* [ ] Port binding

* [ ] Concurrency

* [ ] Disposability

* [ ] Dev/prod parity

* [ ] Logs

* [ ] Admin processes

### Technical spec

Choose any language to build the functionality described in the Tasks that best suits your problem.

#### README

In your repo, please include the following items in your README:

*   Reasoning behind your technical choices, including architecture.
*   Trade-offs you might have made, anything you left out, or what you might do differently if you were to spend additional time on the project.
*   Link to the hosted application (where applicable).

This will give us insight into how you approached the challenge.

### Tips

* Comment your code to show your thought process
* Submit this web design as a directory in your pull request named "{yourname_Task}"

### Resources

* [The Twelve-Factor App](https://12factor.net/)

### Working on the Challenge

01. Fork the code challenge repository provided.

02. Make a topic branch. In your GitHub, keep the master branch clean. Pull all changes, make sure your repository is up to date.

``` shell
cd 2021-project-hack/Software
git pull origin main
```

03. Create a new branch as follows

``` shell
git checkout -b <your_name> main
```

04. See all branches created

``` shell
$ git branch
    main

* <your_name>

```

05. Push the new branch to GitHub

``` shell
$ git push origin -u <your_name>
```

06. Make changes to the fork following the Challenge provided.

07. Check the status of the repo

``` shell
git status
```

08. Add your changed files

``` shell
git add .
```

09. Commit your changes

``` shell
git commit -m "Commit message 😇"
```

10. Push your code changes

``` shell
git push --set-upstream origin <your_name>
```

08. Make a [pull request](https://www.digitalocean.com/community/tutorials/how-to-create-a-pull-request-on-github) to the sesWebsiteChallenge2021 Repo.

**Submissions later than 1845hr 14th October 2021 EAT will not be considered**
