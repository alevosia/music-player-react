export function formatTime(seconds) {
    let hours, minutes
    let string = ''

    seconds = Math.floor(seconds)

    hours = Math.floor(seconds / 3600)
    minutes = Math.floor((seconds % 3600) / 60)
    seconds = Math.floor(seconds % 60)

    if (hours) {
        string += hours > 9 ? hours : `0${hours}:`
    }

    string += minutes > 9 ? minutes : `0${minutes}:`
    string += seconds > 9 ? seconds : `0${seconds}`

    return string
}
