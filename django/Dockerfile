FROM ubuntu:20.04

SHELL ["/bin/bash", "-c"]

RUN apt-get update -y \
    && apt-get upgrade -y \
    && apt-get install -y python3.8 python3.8-dev \
    && source ~/.bashrc \
    && apt-get -y install vim

WORKDIR /usr/src/app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get install -y curl \
    && curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py \
    && apt-get install -y python3.8-distutils \
    && python3.8 get-pip.py \
    && pip install -U pip \
    && apt-get install -y build-essential libssl-dev libffi-dev python-dev python3-dev libpq-dev

RUN pip install pipenv

COPY Pipfile ./

RUN pipenv install --system --skip-lock

RUN apt-get install -y netcat \
    && apt-get install -y expect

COPY . /usr/src/app/
