import express from "express"

import {getServices, getServiceById, addService, updateService, deleteService} from "../managers/ServiceManager.js"

//import {getAllServices, getService, createService, updateService, deleteService} from ""

const router = express.Router()

// READ: obtiene todos los servicios.
router.get("/", async (req, res) => {
  try {
    const { category, available } = req.query

    const services = await getServices()

    let filteredServices = services

    // Filtrar por categoría
    if (category) {
      filteredServices = filteredServices.filter(
        service => service.category === category
      )
    }

    // Filtrar por disponibilidad
    if (available !== undefined) {
      filteredServices = filteredServices.filter(
        service => service.available === (available === "true")
      )
    }

    res.status(200).json({
      status: "success",
      data: filteredServices
    })

  } catch (error) {
    console.error(error)

    res.status(500).json({
      status: "error",
      message: "No se pudieron obtener los servicios"
    })
  }
})

// READ: obtiene un servicio por ID.
router.get("/:sid", async (req, res) => {
  try {
    const service = await getServiceById(req.params.sid)

    if (!service) {
      return res.status(404).json({
        status: "error",
        message: "Servicio no encontrado"
      })
    }

    res.status(200).json({
      status: "success",
      data: service
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      status: "error",
      message: "No se pudo obtener el servicio"
    })
  }
})

// CREATE: agrega un servicio.
router.post("/", async (req, res) => {
  try {
    const { name,description , duration, price, category, available } = req.body

    if ( !name || !description || duration === undefined || price === undefined || !category || available === undefined) {
      return res.status(400).json({
        status: "error",
        message: "Todos los campos son obligatorios"
      })
    }

    const newService = await addService(req.body)

    res.status(201).json({
      status: "success",
      data: newService
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      status: "error",
      message: "No se pudo crear el servicio"
    })
  }
})

// UPDATE: modifica un servicio.
router.put("/:sid", async (req, res) => {
  try {
    const updatedService = await updateService(req.params.sid, req.body)

    if (!updatedService) {
      return res.status(404).json({
        status: "error",
        message: "Servicio no encontrado"
      })
    }

    res.status(200).json({
      status: "success",
      data: updatedService
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      status: "error",
      message: "No se pudo actualizar el servicio"
    })
  }
})

// DELETE: elimina un servicio.
router.delete("/:sid", async (req, res) => {
  try {
    const deleted = await deleteService(req.params.sid)

    if (!deleted) {
      return res.status(404).json({
        status: "error",
        message: "Servicio no encontrado"
      })
    }

    res.status(204).send()
  } catch (error) {
    console.error(error)

    res.status(500).json({
      status: "error",
      message: "No se pudo eliminar el servicio"
    })
  }
})

export default router