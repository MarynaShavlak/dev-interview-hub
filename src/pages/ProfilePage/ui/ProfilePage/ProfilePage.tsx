import { memo } from 'react';
import { Page } from '@/widgets/Page';
import { ProfileContainer } from '../ProfileContainer/ProfileContainer';

interface ProfilePageProps {
    className?: string;
}

const ProfilePage = memo(({ className }: ProfilePageProps) => {
    return (
        <Page className={className} data-testid="ProfilePage">
            <ProfileContainer />
        </Page>
    );
});

export default ProfilePage;
