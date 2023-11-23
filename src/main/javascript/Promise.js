const STATE = {
    FULFILLED: "fulfilled",
    REJECTED: "rejected",
    PENDING: "pending",
}

class MyPromise {
    #handlers = []
    #catchers = []
    #state = STATE.PENDING
    #value = null
    #bindedOnSuccess = this.#onSuccess.bind(this)
    #bindedOnFail = this.#onFail.bind(this)

    constructor(executor) {
        try {
            executor(this.#bindedOnSuccess, this.#bindedOnFail)
        } catch (e) {
            this.#onFail(e)
        }
    }

    #runCallbacks() {
        if (this.#state === STATE.FULFILLED) {
            this.#handlers.forEach(callback => {
                callback(this.#value)
            })

            this.#handlers = []
        }

        if (this.#state === STATE.REJECTED) {
            this.#catchers.forEach(callback => {
                callback(this.#value)
            })

            this.#catchers = []
        }
    }

    #onSuccess(value) {
        queueMicrotask(() => {
            if (this.#state !== STATE.PENDING) return

            if (value instanceof MyPromise) {
                value.then(this.#bindedOnSuccess, this.#bindedOnFail)
                return
            }

            this.#value = value
            this.#state = STATE.FULFILLED
            this.#runCallbacks()
        })
    }

    #onFail(value) {
        queueMicrotask(() => {
            if (this.#state !== STATE.PENDING) return

            if (value instanceof MyPromise) {
                value.then(this.#bindedOnSuccess, this.#bindedOnFail)
                return
            }

            if (this.#catchers.length === 0) {
                console.error('error' + value)
            }

            this.#value = value
            this.#state = STATE.REJECTED
            this.#runCallbacks()
        })
    }

    then(thenCb, catchCb) {
        return new MyPromise((resolve, reject) => {
            this.#handlers.push(result => {
                if (thenCb == null) {
                    resolve(result)
                    return
                }

                try {
                    resolve(thenCb(result))
                } catch (error) {
                    reject(error)
                }
            })

            this.#catchers.push(result => {
                if (catchCb == null) {
                    reject(result)
                    return
                }

                try {
                    resolve(catchCb(result))
                } catch (error) {
                    reject(error)
                }
            })

            this.#runCallbacks()
        })
    }

    catch(cb) {
        return this.then(undefined, cb)
    }

    finally(cb) {
        return this.then(
            result => {
                cb()
                return result
            },
            result => {
                cb()
                throw result
            }
        )
    }
}