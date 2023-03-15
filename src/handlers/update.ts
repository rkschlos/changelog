import prisma from "../db";

//Get all updates

export const getUpdates = async (req, res) => {
    const products = prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            updates: true
        }
    })

    //not ideal at all, need to change schema
    const updates = (await products).reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates]
    }, [])

    res.json({data: updates})
    
}

export const getOneUpdate = async (req, res) => {
    const update = await prisma.update.findUnique({
        where: {
            id: req.params.id
        }
    })
    
    res.json({data: update})
}

export const createUpdate = async (req, res) => {
    const product = await prisma.product.findUnique({
        where: {
            id: req.body.id
        }
    })

    if (!product) {
        return res.json({ message: 'nope '})
    }

    const update = await prisma.update.create({
        data: req.body
    })
}

export const updateUpdate = async (req, res) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id,
        },
        include: {
            updates: true
        }
    })

    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, product.updates]
    }, [] )
}

export const deleteUpdate = async (req, res) => {}