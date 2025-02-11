import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { AvatarUploaderRedesigned } from './AvatarUploaderRedesigned/AvatarUploaderRedesigned';
import { AvatarUploaderDeprecated } from './AvatarUploaderDeprecated/AvatarUploaderDeprecated';

export interface AvatarUploaderProps {
    avatar: string;
    readonly?: boolean;
    onFileUpload: (file: File | null) => void;
}

export const AvatarUploader = (props: AvatarUploaderProps) => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<AvatarUploaderRedesigned {...props} />}
            off={<AvatarUploaderDeprecated {...props} />}
        />
    );
};
