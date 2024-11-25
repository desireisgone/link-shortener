FROM maven:3.9.9-eclipse-temurin-22 AS builder
WORKDIR /backend
COPY pom.xml /backend/pom.xml
RUN mvn dependency:go-offline

COPY src /backend/src
RUN ["mvn", "install", "-Dmaven.test.skip=true"]

FROM builder AS dev-envs
RUN <<EOF
apt-get update
apt-get install -y --no-install-recommends git
EOF

RUN <<EOF
useradd -s /bin/bash -m vscode
groupadd docker
usermod -aG docker vscode
EOF
# install Docker tools (cli, buildx, compose)
COPY --from=gloursdocker/docker / /
CMD ["mvn", "spring-boot:run"]

FROM builder AS prepare-production
RUN mkdir -p target/dependency
WORKDIR /backend/target/dependency
RUN jar -xf ../*.jar

FROM eclipse-temurin:22
EXPOSE 8080
VOLUME /tmp
ARG DEPENDENCY=/backend/target/dependency
COPY --from=prepare-production ${DEPENDENCY}/BOOT-INF/lib /app/lib
COPY --from=prepare-production ${DEPENDENCY}/META-INF /app/META-INF
COPY --from=prepare-production ${DEPENDENCY}/BOOT-INF/classes /app
ENTRYPOINT ["java","-cp","app:app/lib/*","org.link_shortener.LinkShortenerApplication"]