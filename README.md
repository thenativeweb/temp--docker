# Docker

- Historically, there is a gap between dev and ops people
  - Developers create new things, explore things, … => creative
  - Ops take care of existing things, keep things up and running => conservative
- Different requirements
  - Dev: Use latest versions, get updates, try things out, …
  - Ops: Stay with a stable version, avoid updates, keep things, …
- Different deployment strategies
  - XCOPY deployment (includes FTP, SCP, …)
  - Installers (MSI, Nullsoft Installer, …)
- Drawbacks
  - You don't control the operating system
  - You don't control the installed libraries (think of `mfc42.dll`)
  - You don't control other software
  - Copying is one thing, but how do you configure things?
- Possible solutions
  - Write some manual and let someone work things out manually
    - High risk of misinterpretation, risk of conflicts, …
  - Create a virtual machine to host your application
    - Solve all the problems mentioned above
    - VMs are heavyweight, large, annoying, …

```
      App         App         App
   Libraries   Libraries   Libraries
    Kernel      Kernel      Kernel
      VM          VM          VM
            Virtualization
              Libraries
               Kernel
                Host
```

- Linux Containers (LXC)
  - Like a "jail" / "box" for individual (!) processes
  - From within the container the process doesn't see other processes
  - From within the container the process can't access the entire disk
  - From within the container the process can't do everything on the network
  - From within the container the process can't access the entire RAM
  - All containers use the very same Linux kernel

```
  App            App          App
Libraries     Libraries     Libraries
        Linux Containers (LXC)
             Libraries
            Linux Kernel
                Host
```

- Deploying things with Linux containers
  - Collect all the files you will need inside of the container
  - Bundle all these files in an archive (think of a `.tar` archive)
  - Use Linux and make sure it supports LXC
  - Copy the archive to this Linux machine
  - Take the main process from within the archive and run it inside of a container
  - Attach the archive as virtual file system to this container

- dotCloud, Inc.
  - Cloud provider, basically like AWS, Azure, GCP, …
  - They built an abstraction layer on top of Linux Containers
  - They called this abstraction layer "Docker" and open-sourced it
  - dotCloud, Inc. turned to Docker, Inc., and focused solely on Docker as a product

- Docker means …
  - A company (Docker, Inc.)
  - A product (Docker)
  - A category of products (Containerization)

## Installing Docker

- Linux
  - Typically, it's something such as `apt-get install docker`
  - https://docs.docker.com/engine/install/centos/
  - Beware, this is only the *Docker Engine*
    - Docker is split into two parts, a server (daemon), and a client (CLI)
    - Docker Engine does not contain any additional tools
- macOS and Windows
  - Use a virtual machine, install Linux, install Docker there
  - The Linux distribution used can be very small and be made especially for running Linux containers
  - *Docker Desktop*
    - Includes the VM with Linux and Docker Engine
    - Includes some macOS- / Windows-specific tools for Docker
    - Includes additional tools
      - https://docs.docker.com/desktop/mac/install/
      - https://docs.docker.com/desktop/windows/install/
- Two editions of Docker
  - CE (Community Edition)
  - EE (Enterprise Edition)

## Important Docker commands

```shell
# Show the product version of the CLI
$ docker --version

# Show the product versions of the CLI and the daemon
$ docker version

# Run a container interactively
# - ubuntu is the image (aka archive)
# - bash is the process within the image that you want to run as a container
$ docker run -it ubuntu bash

# Run a container in detached mode
$ docker run -d nginx

# Run a container with options (works with `-it` and `-d` equally well)
$ docker run -d --name <container-name> \
    [--init] \
    [--restart=always] \
    [-p <host-port>:<container-port>] \
    [-e KEY="value"] \
    [-v <host-path>:<container-path>[:ro]] \
    nginx

# Stop a container
$ docker stop <container-id | container-id-prefix | container-name>

# Stop a container immediately
$ docker kill <container-id | container-id-prefix | container-name>

# Restart a stopped container
$ docker start <container-id | container-id-prefix | container-name>

# Pull an image
$ docker pull <image-name>

# Show all images
$ docker images

# Show (all) containers
$ docker ps [-a]

# Execute a new process in an existing container
$ docker exec -it <container-id | container-id-prefix | container-name> <process>

# Show log output (with optional follow mode)
$ docker logs [-f] <container-id | container-id-prefix | container-name>

# Remove a container
$ docker rm <container-id | container-id-prefix | container-name>

# Remove an image
$ docker rmi <image-id | image-id-prefix | image-name>

# Clean up and remove non-needed things from the system
$ docker system prune --all

# Build a Docker image
$ docker build -t <name:tag> <path-to-directory-of-dockerfile>

# Run the example app
$ docker run \
    -d \
    -p 3000:3000 \
    --init \
    --name hello-world \
    -e MESSAGE="Un, deux, trois – bienvenue" \
    goloroden/hello-world
```

## Using Docker-Compose

- On Linux
  - You have to install it manually
  - https://docs.docker.com/compose/install/
- On macOS and Windows
  - It is available as part of Docker Desktop
- Multi-container setups
  - Treat multiple containers as a common unit with a common lifecycle

```shell
# Start all the containers (in interactive mode)
$ docker compose up -it

# Start all the containers (in detached mode)
$ docker compose up -d

# Use parameters
$ docker compose --env-file <envfile> up

# Containers will follow this naming schema:
# <directory>_<service>_1
# e.g. ptv-docker_hello-world_1

# See which containers are running
$ docker compose ps

# Stop all running containers
$ docker compose stop

# Stop all running containers and clean up
$ docker compose down --volumes

# Show compose configuration including all the interpolations
$ docker compose config
```
