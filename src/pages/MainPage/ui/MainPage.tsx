import React, { memo } from 'react';
import { Page } from '@/widgets/Page';
import { VStack } from '@/shared/ui/common/Stack';
import { AudienceSection } from './AudienceSection/AudienceSection';
import { HeroSection } from './HeroSection/HeroSection';
import { ProblemsSection } from './ProblemsSection/ProblemsSection';
import { FeaturesSection } from './AudienceSection/FeaturesSection/FeaturesSection';

const MainPage = memo(() => {
    // const mockItems = Array.from({ length: 20 }, (_, i) => ({
    //     trigger: `Item ${i + 1}`,
    //     content: `This is the content of item ${i + 1}`,
    //     value: `item-${i + 1}`,
    // }));

    return (
        <Page data-testid="MainPage">
            <VStack gap="40" align="center">
                <HeroSection />
                <AudienceSection />
                <ProblemsSection />
                <FeaturesSection />
                {/* <Accordion collapsible items={mockItems} type="single" /> */}
            </VStack>
        </Page>
    );
});

export default MainPage;
