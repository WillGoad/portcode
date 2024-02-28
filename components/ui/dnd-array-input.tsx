import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Button } from "./button";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./form";
import InputWithIcon from "./input-with-icon";
import { cn } from "@/lib/utils";

type DNDArrayInputProps = {
    title: string;
    description: string;
    appendString: string;
    fieldName: string
    form: any;
    fields: any;
    append: any;
    remove: any;
}



function DNDArrayInput({ title, description, appendString, fieldName, form, fields, append, remove }: DNDArrayInputProps) {

    const handleOnDragEnd = (result: any) => {
        if (!result.destination) return;
        const items = Array.from(fields);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        form.setValue(fieldName, items);
    }

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId={fieldName}>
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {fields.map((field: any, index: any) => (

                            <FormField
                                control={form.control}
                                key={field.id}
                                name={`${fieldName}.${index}.value`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className={cn(index !== 0 && "sr-only")}>
                                            {title}
                                        </FormLabel>
                                        <FormDescription className={cn(index !== 0 && "sr-only")}>
                                            {description}
                                        </FormDescription>
                                        <FormControl>

                                            <Draggable draggableId={String(index)} index={index}>
                                                {(provided) => (
                                                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                        <InputWithIcon field={field} onBlur={(e: any) => {
                                                            if (e.target.value === '') {
                                                                remove(index);
                                                            }
                                                        }} />

                                                    </div>
                                                )}
                                            </Draggable>

                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                        ))}
                        {provided.placeholder}
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="mt-2"
                            onClick={() => append({ value: "" })}
                        >
                            {appendString}
                        </Button>
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}

export default DNDArrayInput;