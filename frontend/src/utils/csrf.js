export function getCsrfTokenFromCookie() {
    const match = document.cookie.match(/CSRF-TOKEN=([^;]+)/)
    return match ? decodeURIComponent(match[1]) : ""
}