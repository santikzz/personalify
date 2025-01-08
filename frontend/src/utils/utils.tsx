import { format } from 'date-fns';
import { es } from 'date-fns/locale'

export const upperFirst = (string: string) => {
    try {
        return string.charAt(0).toUpperCase() + string.slice(1);
    } catch (e) {
        return string;
    }
}

export const formatDate = (date: Date) => {
    const dayOfWeek = upperFirst(format(date, 'EEEE', { locale: es }));
    const day = format(date, 'dd', { locale: es });
    const monthName = upperFirst(format(date, 'MMMM', { locale: es }));
    const year = format(date, 'yyyy', { locale: es });

    return `${dayOfWeek} ${day}, ${monthName} ${year}`;
}

export const toSnakeCase = (str: string): string => {
    return str
        .replace(/([a-z])([A-Z])/g, '$1_$2') // Add an underscore between lowercase and uppercase letters
        .replace(/\s+/g, '_')               // Replace spaces with underscores
        .replace(/-+/g, '_')                // Replace hyphens with underscores
        .replace(/[^a-zA-Z0-9_]/g, '')      // Remove non-alphanumeric characters except underscores
        .toLowerCase();                     // Convert the entire string to lowercase
};
export const toAvatarFallback = (strA: string, strB: string) => {
    return strA?.charAt(0).toUpperCase() + strB?.charAt(0).toUpperCase();
};

export const formatTimeAgo = (timestamp: number) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInSeconds = Math.floor((now - time) / 1000);

    if (diffInSeconds < 60) {
        return "Hace unos segundos";
    } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `Hace ${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`;
    } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `Hace ${hours} ${hours === 1 ? 'hora' : 'horas'}`;
    } else if (diffInSeconds < 2592000) { // 30 days
        const days = Math.floor(diffInSeconds / 86400);
        return `Hace ${days} ${days === 1 ? 'día' : 'días'}`;
    } else if (diffInSeconds < 31536000) { // 365 days
        const months = Math.floor(diffInSeconds / 2592000); // Approximate month length
        return `Hace ${months} ${months === 1 ? 'mes' : 'meses'}`;
    } else {
        const years = Math.floor(diffInSeconds / 31536000); // Approximate year length
        return `Hace ${years} ${years === 1 ? 'año' : 'años'}`;
    }
};

export const trimString = (str: string, maxLength: number) => {
    if (!str) {
        return "";
    }
    if (str.length <= maxLength) {
        return str;
    }
    return str.substring(0, maxLength) + '...';
}
