import { useOthers, useSelf } from "@liveblocks/react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Avatars(){
    const others = useOthers();
    const self = useSelf();

    const all = [...others, self];

    return (
        <div>
            <p>Users Currently editing this page</p>
            <div>
                {all.map((user) => {
                    return (<Tooltip>
                        <TooltipTrigger>
                            <Avatar>
                                <AvatarImage src={user?.info.avatar} />
                                <AvatarFallback>{user?.info.name[0]}{user?.info.name[1]}</AvatarFallback>
                            </Avatar>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{self?.id === user?.id ? "You" : user?.info.name}</p>
                        </TooltipContent>
                    </Tooltip>)
    })}
            </div>
        </div>
    )
}