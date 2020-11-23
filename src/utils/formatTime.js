export function formatTime(seconds) {
    if (typeof seconds !== 'number' || isNaN(seconds)) {
        return '0:00'
    }

    const minutes = Math.floor(seconds / 60)
    seconds = `0${Math.floor(seconds % 60)}`.slice(-2)

    return `${minutes}:${seconds}`
}
