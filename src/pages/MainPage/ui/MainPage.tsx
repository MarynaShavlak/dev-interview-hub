import React, { memo } from 'react';
import { Page } from '@/widgets/Page';
import { VStack } from '@/shared/ui/common/Stack';
import { AudienceSection } from './AudienceSection/AudienceSection';
import { HeroSection } from './HeroSection/HeroSection';
import { ProblemsSection } from './ProblemsSection/ProblemsSection';
import { FeaturesSection } from './AudienceSection/FeaturesSection/FeaturesSection';

const MainPage = memo(() => {
    return (
        <Page data-testid="MainPage">
            <VStack gap="40" align="center">
                <HeroSection />
                <AudienceSection />
                <ProblemsSection />
                <FeaturesSection />
            </VStack>
        </Page>
    );
});

export default MainPage;
