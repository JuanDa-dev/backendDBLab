export const httpError = (res, error) => {
    res.status(500)
    res.send({ error: 'Algo ocurrio' })
    console.log(error)
}