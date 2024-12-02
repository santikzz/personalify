import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toAvatarFallback } from "@/utils/utils";
import { Link } from "react-router-dom";

export default function UserAvatar({ user, showName = true }) {

    return (
        <div className="flex flex-row items-center gap-2">
            <Avatar>
                <AvatarImage src={''} alt="profile" />
                <AvatarFallback className="bg-gray-200 dark:bg-neutral-700">XD</AvatarFallback>
            </Avatar>
            <Link className="text-sm hover:underline" to='user/1'>santi francisco</Link>
        </div>
    )

}