import React from 'react'
import {BasePropertyProps} from 'admin-bro';
import { Label,Box,DropZone } from '@admin-bro/design-system'



const Edit:React.FC<BasePropertyProps>=(props)=>{
    const {property,onChange}=props;

    const handleDropZoneChange=(files)=>{
		console.log("property.nameproperty.nameproperty.nameproperty.nameproperty.name",property.name)
onChange(property.name,files[0])
    }
    return (
        <Box>
            <Label>{property.label}</Label>
           <DropZone onChange={handleDropZoneChange}/>
            
            </Box>
    )
}
export default Edit