#!/bin/bash
msg() {
    local colors="/etc/new-adm-color"
    if [[ ! -e $colors ]]; then
        COLOR[0]='\033[1;37m'
        COLOR[1]='\e[31m'
        COLOR[2]='\e[32m'
        COLOR[3]='\e[33m'
        COLOR[4]='\e[34m'
        COLOR[5]='\e[35m'
        COLOR[6]='\033[1;36m'
    else
        local COL=0
        for number in $(cat $colors); do
            case $number in
            1) COLOR[$COL]='\033[1;37m' ;;
            2) COLOR[$COL]='\e[31m' ;;
            3) COLOR[$COL]='\e[32m' ;;
            4) COLOR[$COL]='\e[33m' ;;
            5) COLOR[$COL]='\e[34m' ;;
            6) COLOR[$COL]='\e[35m' ;;
            7) COLOR[$COL]='\033[1;36m' ;;
            esac
            let COL++
        done
    fi
    NEGRITO='\e[1m'
    SEMCOR='\e[0m'
    case $1 in
    -ne) cor="${COLOR[1]}${NEGRITO}" && echo -ne "${cor}${2}${SEMCOR}" ;;
    -ama) cor="${COLOR[3]}${NEGRITO}" && echo -e "${cor}${2}${SEMCOR}" ;;
    -verm) cor="${COLOR[3]}${NEGRITO}[!] ${COLOR[1]}" && echo -e "${cor}${2}${SEMCOR}" ;;
    -verm2) cor="${COLOR[1]}${NEGRITO}" && echo -e "${cor}${2}${SEMCOR}" ;;
    -azu) cor="${COLOR[6]}${NEGRITO}" && echo -e "${cor}${2}${SEMCOR}" ;;
    -verd) cor="${COLOR[2]}${NEGRITO}" && echo -e "${cor}${2}${SEMCOR}" ;;
    -bra) cor="${COLOR[0]}${NEGRITO}" && echo -e "${cor}${2}${SEMCOR}" ;;
    "-bar2" | "-bar") cor="${COLOR[4]}======================================================" && echo -e "${SEMCOR}${cor}${SEMCOR}" ;;
    esac
}
lokRoot=$(pwd)
cekSystem() {
    if [[ "${EUID}" -ne 0 ]]; then
        msg -verm "Kamu harus jalankan script ini mode root"
        exit 1
    fi
    if [[ -e /etc/debian_version ]]; then
        NAMEOS=$(cat /etc/os-release | grep "NAME" | head -1)
        [[ "$NAMEOS" != 'NAME="Ubuntu"' ]] && {
            echo "Anda sekarang tidak menjalankan OS Ubuntu!."
            while [[ $CONTINUE != @(y|Y|s|S|n|N) ]]; do
                read -p "Lanjutkan ? [y/n]: " -e CONTINUE
            done
            [[ "$CONTINUE" = @(n|N) ]] && exit 1
        }
    else
        msg -ama "Sepertinya Anda tidak menjalankan script ini pada sistem Debian atau Ubuntu"
        msg -bar
        return 1
    fi
}
cekSystem
msg -bar
msg -ama "Cek package yang diperlukan"
msg -bar

[[ $(dpkg --get-selections | grep -w "nordvpn" | head -1) ]] || {
    msg -ama "Menginstall nordvpn!"
    wget https://repo.nordvpn.com/deb/nordvpn/debian/pool/main/nordvpn-release_1.0.0_all.deb &>/dev/null && dpkg -i nordvpn*.deb &>/dev/null && apt update &>/dev/null && apt install nordvpn &>/dev/null
    msg -ama "Selesai"
    msg -bar
}
[[ $(dpkg --get-selections | grep -w "node" | head -1) ]] || {
    msg -ama "Menginstall nodejs dan npm!"
    cd /opt && chmod -R 755 ./ && wget https://nodejs.org/download/release/v14.14.0/node-v14.14.0-linux-x64.tar.gz &>/dev/null && sudo tar -xvf node-* &>/dev/null
    cd $lokRoot
    msg -ama "Selesai"
    msg -bar
}
node index.js
