FROM mpich:1

RUN apt-get update && apt-get install unzip

ARG USER,
ENV USER ${USER}
RUN adduser -D ${USER}
ENV USER_HOME /home/${USER}
RUN chown -R ${USER}:${USER} ${USER_HOME}
ARG WORKDIR
ENV WORKDIR ${WORKDIR}
RUN mkdir ${WORKDIR}
RUN chown -R ${USER}:${USER} ${WORKDIR}
ENV OPAL_PREFIX="/usr/local"
WORKDIR ${WORKDIR}
USER USER

ARG cpp_file
COPY ${WORKDIR}/application.zip .
RUN unzip application.zip
RUN cpp_file=$(find . -type f -name "*.cpp" -print -quit)
RUN mpic++ ${cpp_file} -o hello_world.exe
CMD ["./hello_world.exe"]
