﻿namespace WebApi.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using AutoMapper;
    using Core.Entities;
    using Core.Interfaces;
    using Data.Context;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using WebApi.Resources;

    [Route("api/[controller]")]
    [ApiController]
    public class VehiclesController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IVehicleRepository _vehicleRepository;

        public VehiclesController(IMapper mapper, IUnitOfWork unitOfWork, IVehicleRepository vehicleRepository)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _vehicleRepository = vehicleRepository;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetVehicle(int id)
        {
            var vehicle = await _vehicleRepository.GetVehicle(id);

            if (vehicle == null)
            {
                return NotFound();
            }

            var vehicleResource = _mapper.Map<Vehicle, VehicleResource>(vehicle);

            return Ok(vehicleResource);
        }

        [HttpPost]
        public async Task<IActionResult> CreateVehicle(SaveVehicleResource vehicleResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Send a ModelId that does not exist.
            /* var model = await _context.Models.FindAsync(vehicleResource.ModelId);
            if (model == null)
            {
                ModelState.AddModelError("ModelId", "Invalid Model");
                return BadRequest(ModelState);
            } */

            var vehicle = _mapper.Map<SaveVehicleResource, Vehicle>(vehicleResource);

            vehicle.LastUpdate = DateTime.Now;

            _vehicleRepository.AddVehicle(vehicle);
            await _unitOfWork.CompleteAsync();

            vehicle = await _vehicleRepository.GetVehicle(vehicle.Id);

            var result = _mapper.Map<Vehicle, VehicleResource>(vehicle);

            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateVehicle(int id, SaveVehicleResource vehicleResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var vehicle = await _vehicleRepository.GetVehicle(id);

            if (vehicle == null)
            {
                return NotFound();
            }

            _mapper.Map<SaveVehicleResource, Vehicle>(vehicleResource, vehicle);
            vehicle.LastUpdate = DateTime.Now;

            await _unitOfWork.CompleteAsync();

            vehicle = await _vehicleRepository.GetVehicle(id);

            var result = _mapper.Map<Vehicle, VehicleResource>(vehicle);

            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVehicle(int id)
        {
            var vehicle = await _vehicleRepository.GetVehicle(id, includeRelated: false);

            if (vehicle == null)
            {
                return NotFound();
            }

            _vehicleRepository.RemoveVehicle(vehicle);
            await _unitOfWork.CompleteAsync();

            return Ok(id);
        }

        [HttpGet]
        public async Task<IEnumerable<VehicleResource>> GetVehicles([FromQuery]FilterResource filterResource)
        {
            var filter = _mapper.Map<FilterResource, Filter>(filterResource);
            var vehicles = await _vehicleRepository.GetVehicles(filter);

            return _mapper.Map<IEnumerable<Vehicle>, IEnumerable<VehicleResource>>(vehicles);
        }

    }
}