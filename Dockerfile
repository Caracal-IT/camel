FROM openjdk:20
WORKDIR app
COPY certs ./certs
RUN keytool -import -alias dev.divigraph.com -file certs/divigraph-dev.pem -keystore /usr/java/latest/lib/security/cacerts -noprompt -keypass password1 -storepass changeit
COPY target .
ENTRYPOINT ["java", "-jar", "camel-0.0.2-SNAPSHOT.jar"]