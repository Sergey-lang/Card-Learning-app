import {RegistrationRequestType, RegistrationResponseType} from '../02-Pages/02-Registration/registration-reducer';
import {instance} from './api';

export const registrationAPI = {

    registration(dataReg: RegistrationRequestType) {
        return instance.post<RegistrationResponseType>(`auth/register`, {...dataReg})
    }
}
