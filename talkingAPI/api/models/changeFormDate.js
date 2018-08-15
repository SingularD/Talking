const changeFormDate = {
    changeData: function (time) {
        let date = new Date(time)
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let strDate = date.getDate()
        if (month >= 1 && month <= 9) {
            month = '0' + month
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = '0' + strDate
        }
        let hour = date.getHours()
        if (hour >= 1 && hour <= 9) {
            hour = '0' + hour
        }
        let min = date.getMinutes()
        if (min >= 1 && min <= 9) {
            min = '0' + min
        }
        let seconds = date.getSeconds()
        if (seconds >= 1 && seconds <= 9) {
            seconds = '0' + seconds
        }
        let currentTime = year + '-' + month + '-' +
            strDate + ' ' + hour + ':' + min + ':' + seconds
        return currentTime
    }
}

module.exports = changeFormDate