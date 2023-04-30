FROM openjdk:20
WORKDIR app
COPY certs/site/master ./certs/site/master
RUN keytool -import -alias dev.caracal.com -file certs/site/master/caracal-dev.pem -keystore /usr/java/latest/lib/security/cacerts -noprompt -keypass password1 -storepass changeit
COPY target .
ENTRYPOINT ["java", "-jar", "camel-0.0.2-SNAPSHOT.jar"]