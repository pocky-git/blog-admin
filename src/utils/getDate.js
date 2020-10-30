export default function getDate(time){
    return `${new Date(time).getFullYear()}-${new Date(time).getMonth()+1}-${new Date(time).getDate()} ${new Date(time).getHours()}:${new Date(time).getMinutes()}:${new Date(time).getSeconds()}`
}