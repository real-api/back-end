router.post('/blogs', (req, res, next) => {
    try {
        //عملیات ذخیره و ثبت بلاگ در دیتابیس
        blogModel.saveBlogToDB(data);
        //اگر به هر دلیلی میدونی خطا داره یا قراره خطا پیش بیاد اینجا مدیریتش میکنیم
        throw ErrorHandler({ status: 404 });
    } catch (error) {
        //در اینجا خطای مدیریت شده را به اکسپرس معرف میکنیم
        next(error)
    }
})
function ErrorHandler(object) {
    let { status } = object
    switch (status) {
        case 400: return { status, error: "Bad Request" }
        case 401: return { status, error: "Unauthorized" }
        case 403: return { status, error: "Forbidden" }
        case 404: return { status, error: "Not Found" }
        case 500: return { status, error: "Internal Server Error" }
        default: return { status: 503, error: "service unavailable" }
    }
}


app.use((err, req, res, next) => {
    res.status(err.status).json(err)
})