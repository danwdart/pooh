FROM ubuntu:12.04

RUN apt-get update && \
    apt-get install -y ubuntu-standard openssh-server telnetd

RUN mkdir /var/run/sshd

RUN useradd -m -G sudo admin
RUN useradd -m -G sudo pi
RUN useradd -m -G sudo support
RUN useradd -m -G sudo ubuntu
RUN useradd -m -G sudo user

RUN echo root:root | chpasswd
RUN echo admin:admin | chpasswd
RUN echo pi:raspberry | chpasswd
RUN echo support:support | chpasswd
RUN echo ubuntu:ubuntu | chpasswd
RUN echo user:user | chpasswd

EXPOSE 22
EXPOSE 23

CMD ["/usr/sbin/sshd", "-D"]
