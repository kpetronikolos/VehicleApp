﻿namespace WebApi.Mapping
{
    using AutoMapper;
    using Core.Entities;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using WebApi.Resources;

    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Domain to API Resource
            CreateMap<Make, MakeResource>();
            CreateMap<Make, KeyValuePairResource>();
            CreateMap<Model, KeyValuePairResource>();
            CreateMap<Feature, KeyValuePairResource>();
            CreateMap<Vehicle, SaveVehicleResource>()
                .ForMember(vr => vr.Contact, opt => opt.MapFrom(v => new ContactResource { Name = v.ContactName, Email = v.ContactEmail, Phone = v.ContactPhone }))
                .ForMember(vr => vr.VehicleFeatures, opt => opt.MapFrom(v => v.VehicleFeatures.Select(vf => vf.FeatureId)));
            CreateMap<Vehicle, VehicleResource>()
              .ForMember(vr => vr.Make, opt => opt.MapFrom(v => v.Model.Make))
              .ForMember(vr => vr.Contact, opt => opt.MapFrom(v => new ContactResource { Name = v.ContactName, Email = v.ContactEmail, Phone = v.ContactPhone }))
              .ForMember(vr => vr.VehicleFeatures, opt => opt.MapFrom(v =>
                v.VehicleFeatures.Select(vf => new KeyValuePairResource { Id = vf.Feature.Id, Name = vf.Feature.Name })));

            // API Resource to Domain
            CreateMap<FilterResource, Filter>();
            CreateMap<SaveVehicleResource, Vehicle>()
                .ForMember(v => v.Id, opt => opt.Ignore())
                .ForMember(v => v.ContactName, opt => opt.MapFrom(vr => vr.Contact.Name))
                .ForMember(v => v.ContactEmail, opt => opt.MapFrom(vr => vr.Contact.Email))
                .ForMember(v => v.ContactPhone, opt => opt.MapFrom(vr => vr.Contact.Phone))
                //.ForMember(v => v.VehicleFeatures, opt => opt.MapFrom(vr => vr.VehicleFeatures.Select(id => new VehicleFeature { FeatureId = id })));
                .ForMember(v => v.VehicleFeatures, opt => opt.Ignore())
                .AfterMap((vr, v) =>
                {
                    // Remove unselected features
                    // Before Refactor
                    //var removedFeatures = new List<VehicleFeature>();
                    //foreach (var feature in v.VehicleFeatures)
                    //{
                    //    if (!vr.VehicleFeatures.Contains(feature.FeatureId))
                    //    {
                    //        removedFeatures.Add(feature);
                    //    }
                    //}

                    // After Refactor
                    var removedFeatures = v.VehicleFeatures.Where(feature => !vr.VehicleFeatures.Contains(feature.FeatureId)).ToList();

                    foreach (var f in removedFeatures)
                    {
                        v.VehicleFeatures.Remove(f);
                    }

                    // Add new Features
                    // Before Refactor
                    //foreach (var id in vr.VehicleFeatures)
                    //{
                    //    if (!v.VehicleFeatures.Any(f => f.FeatureId == id))
                    //    {
                    //        v.VehicleFeatures.Add(new VehicleFeature { FeatureId = id });
                    //    }
                    //}

                    // After Refactor
                    var addedFeature = vr.VehicleFeatures
                                        .Where(id => !v.VehicleFeatures.Any(f => f.FeatureId == id))
                                        .Select(id => new VehicleFeature { FeatureId = id });

                    foreach (var f in addedFeature)
                    {
                        v.VehicleFeatures.Add(f);
                    }


                });
        }
    }
}
