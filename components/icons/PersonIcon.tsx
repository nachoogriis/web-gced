interface PersonIconProps {
    width?: number;
    height?: number;
}

export default function PersonIcon({
    width = 50,
    height = 50,
}: PersonIconProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 50 50" fill="none">
            <path d="M25 8.33331C27.2102 8.33331 29.3298 9.21129 30.8926 10.7741C32.4554 12.3369 33.3334 14.4565 33.3334 16.6666C33.3334 18.8768 32.4554 20.9964 30.8926 22.5592C29.3298 24.122 27.2102 25 25 25C22.7899 25 20.6703 24.122 19.1075 22.5592C17.5447 20.9964 16.6667 18.8768 16.6667 16.6666C16.6667 14.4565 17.5447 12.3369 19.1075 10.7741C20.6703 9.21129 22.7899 8.33331 25 8.33331ZM25 29.1666C34.2084 29.1666 41.6667 32.8958 41.6667 37.5V41.6666H8.33337V37.5C8.33337 32.8958 15.7917 29.1666 25 29.1666Z" fill="#1E1E1E"/>
        </svg>
    );
  }