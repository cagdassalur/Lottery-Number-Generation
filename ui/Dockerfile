FROM httpd:latest
WORKDIR /usr/local/apache2/htdocs

COPY ./src ./
COPY start.sh ./
RUN chmod +x ./start.sh

EXPOSE 80

ENTRYPOINT ./start.sh