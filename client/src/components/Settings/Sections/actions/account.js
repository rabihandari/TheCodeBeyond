import { changeEmail } from '../../../../api';

export default class Helper {
    constructor(profile, setProfile){
        this.profile = profile;
        this.setProfile = setProfile;
        this.imageFile = null;
    }
    
    // -------------- Email -------------- //
    editEmail = () => (e) => {
        this.setProfile({...this.profile, email: e.target.value})
    }

    saveEmail = () => changeEmail({ email: this.profile.email });

}