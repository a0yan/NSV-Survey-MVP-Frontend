import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import { useEffect } from 'react'
import { Text } from 'react-native';

function userOnly( { children }: { children: React.ReactNode }) {
    const {user, isAuthenticated} = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isAuthenticated && user===null){
            router.replace('/login');
        }
    },[user, isAuthenticated])

    if (!isAuthenticated || !user) {
        return (
            <Text>
                Loading...
            </Text>
        )
    }

    return children
}

export default userOnly
