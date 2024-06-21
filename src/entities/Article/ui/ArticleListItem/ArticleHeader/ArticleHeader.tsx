import { Article } from '../../../model/types/article';
import { Avatar } from '@/shared/ui/Avatar';
import { Text } from '@/shared/ui/Text';
import cls from './ArticleHeader.module.scss';

export const ArticleHeader = ({ article }: { article: Article }) => (
    <div className={cls.header}>
        <Avatar size={30} src={article.user.avatar} />
        <Text text={article.user.username} className={cls.username} />
        <Text text={article.createdAt} className={cls.date} />
    </div>
);
