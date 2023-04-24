FROM openjdk:20
WORKDIR app
COPY certs ./certs
COPY target .
ENTRYPOINT ["java", "-jar", "camel-0.0.2-SNAPSHOT.jar"]