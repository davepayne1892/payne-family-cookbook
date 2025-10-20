type RecipeContentProps = {
  content: string;
};

const Section = ({ title, items, ordered }: { title: string; items: string[]; ordered: boolean }) => {
  const ListTag = ordered ? 'ol' : 'ul';
  const listItemClasses = ordered 
    ? "list-decimal list-inside" 
    : "list-disc list-inside";

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-headline text-primary border-b-2 border-primary/50 pb-2">
        {title}
      </h2>
      <ListTag className={`space-y-2 text-foreground/90 ${listItemClasses} pl-2`}>
        {items.map((item, index) => (
          <li key={index} className="pl-2 leading-relaxed">
            {item.replace(/^(\d+\.|-)\s*/, '')}
          </li>
        ))}
      </ListTag>
    </div>
  );
};

export function RecipeContent({ content }: RecipeContentProps) {
  const sections = content.split('### ').filter(Boolean);

  const ingredientsSection = sections.find(s => s.toLowerCase().startsWith('ingredients'));
  const instructionsSection = sections.find(s => s.toLowerCase().startsWith('instructions'));

  const parseSection = (sectionContent: string | undefined) => {
    if (!sectionContent) return { title: '', items: [] };
    const lines = sectionContent.split('\n').filter(line => line.trim() !== '');
    const title = lines[0]?.trim() || '';
    const items = lines.slice(1).filter(line => line.trim().startsWith('- ') || /^\d+\./.test(line.trim()));
    return { title, items };
  };
  
  const { title: ingredientsTitle, items: ingredientsItems } = parseSection(ingredientsSection);
  const { title: instructionsTitle, items: instructionsItems } = parseSection(instructionsSection);

  return (
    <div className="grid md:grid-cols-5 gap-8">
      {ingredientsItems.length > 0 && (
         <div className="md:col-span-2">
            <Section title={ingredientsTitle} items={ingredientsItems} ordered={false} />
        </div>
      )}
      {instructionsItems.length > 0 && (
        <div className="md:col-span-3">
            <Section title={instructionsTitle} items={instructionsItems} ordered={true} />
        </div>
      )}
    </div>
  );
}
