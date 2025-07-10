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
        <div className="flex items-center">
            <p className="text-muted-foreground text-semibold mr-2">{all.length} users are currently editing this page</p>
            <div>
                {all.map((user , index) => {
                    return (
                    <Tooltip key = {index}>
                        <TooltipTrigger>
                            <Avatar className={`${index != 0 ? `transform -translate-x-5 z-${index}` : ""}`}>
                                <AvatarImage src={user?.info.avatar}/>
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