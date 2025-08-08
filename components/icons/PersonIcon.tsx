interface PersonIconProps {
    width?: number;
    height?: number;
    id: number;
}

export default function PersonIcon({
    width = 75,
    height = 75,
    id = 0
}: PersonIconProps) {
    const imageUrl = `/fake_profile_pictures/${id}.jpeg`;

    return (
        <img 
            src={imageUrl} 
            alt={`Profile picture ${id}`} 
            width={width} 
            height={height} 
            style={{ objectFit: 'cover', borderRadius: '50%' }} // Opcional: para que la imagen sea circular
        />
    );
}