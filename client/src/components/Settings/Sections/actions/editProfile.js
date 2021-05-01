import { changeName, changeBio, changeProfilePicture } from '../../../../api';

export default class Helper {
    constructor(profile, setProfile){
        this.profile = profile;
        this.setProfile = setProfile;
        this.imageFile = null;
    }
    
    // -------------- Name -------------- //
    editName = () => (e) => {
        this.setProfile({...this.profile, name: e.target.value})
    }

    saveName = () => changeName({ name: this.profile.name });

    // -------------- Bio -------------- //
    editBio = () => (e) => {
        this.setProfile({...this.profile, bio: e.target.value})
    }

    saveBio = () => changeBio({ bio: this.profile.bio });

    // -------------- Profile Picture -------------- //
    editProfilePicture = (e) => {
        this.imageFile = e.target.files[0];
        this.profileImage = URL.createObjectURL(this.imageFile);
        this.setProfile({ ...this.profile, profilePicture: this.profileImage, imageFile: e.target.files[0]});
    }

    saveProfilePicture = () => {
        const formData = new FormData();
        formData.append('imageFile', this.profile.imageFile);
        return changeProfilePicture(formData);
    };
}