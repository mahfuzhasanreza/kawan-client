import React, { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import ProfessionalDashboard from './ProfessionalDashboard';
import ProfessionalVerifyRequest from './ProfessionalVerifyRequest';

const Professional = () => {
    const { isVerifyProfessional } = useContext(AuthContext);
    return (
        <div>
            {isVerifyProfessional ? (
                <ProfessionalDashboard />
            ) : (
                <ProfessionalVerifyRequest />
            )}
        </div>
    );
};

export default Professional;