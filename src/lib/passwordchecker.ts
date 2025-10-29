export default function passwordchecker(password: string) {
    
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const islongenough = password.length >= 6;


    let strengthcolor = '';

    if (password.length == 0) {
        strengthcolor = 'border-light-activeborder/60 dark:border-dark-inputborder';
    } else if (hasNumber && hasLower && hasUpper && hasSpecial && islongenough) {
        strengthcolor =  'border-green-500 focus:outline-none'
    } else if (
        (hasNumber || hasSpecial) && (hasLower || hasUpper)
    ) {
        strengthcolor = 'border-blue-500 focus:outline-none'
    } else {
        strengthcolor = 'border-red-500 focus:outline-none'
    }


    return { strengthcolor }
}
