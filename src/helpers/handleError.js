export const httpError = (res) => {
    res.status(500)
    res.send({ error: 'Algo ocurrio' })
}