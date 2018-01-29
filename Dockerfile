FROM ubuntu:12.04

RUN apt-get update && \
    apt-get install -y ubuntu-standard openssh-server

RUN mkdir /var/run/sshd

RUN echo root:root | chpasswd
RUN useradd -m -G sudo -p admin admin

EXPOSE 22

CMD ["/usr/sbin/sshd", "-D"]
