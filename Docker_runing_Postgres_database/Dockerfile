FROM postgres:10.5

ENV POSTGRES_USER docker
ENV POSTGRES_PASSWORD docker
ENV POSTGRES_DB docker

RUN mkdir -p /docker-entrypoint-initdb.d
ADD documents.sql /docker-entrypoint-initdb.d

ADD public/ /pub


