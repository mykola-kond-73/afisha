const dateForSession=/^[A-Z]{1}[a-z]{2}\s[A-Z]{1}[a-z]{2}\s[0-9]{1,2}\s[0-9]{4}$/
const timeForSession=/^[0-9]{2}(:[0-9]{2}){2}\sGMT\+[0-9]{4}\s\(.*\)$/
const email=/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
const phone=/^\+380[0-9]{9}$/

export {
    dateForSession,
    timeForSession,
    email,
    phone
}