RiotLinks
=========

Riot Links provides some simple tools and patterns for creating reusable Riot.js tags that provide maximum flexibility and reusability. These are specifically designed to require no tight bindings within the riot tags themselves, so that they can be used regardless of what overall messaging or coordination tools might be in use.

The primary mechanisms provided are that of Delegates and broadcast registration. Delegation allows one element to have its behavior modified in important ways by another object or function. Broadcast registration allows a tag to emit events on itself, and allows it to indicate to any interested parties which events may be of interest to elements outside of itself, without depending upon any particular router or mechanism.

These patterns allow Riot components to be blissfully unaware of the specifics of the application they are being included into.  This makes them more reusable as they are bound to no specific router, and therefore can be used with any while not sacrificing functionality.

Delegation
----------

Delegation permits the tag author to provide a general-purpose tag that includes advanced functionality, but allows that tag to ask another object/function for how to handle certain situations. See [wikipedia](https://en.wikipedia.org/wiki/Delegation_%28programming%29#Design_pattern|wikpedia) for more information)

A good example of Delegation would be if you created an editable table tag, and wanted to allow some cells to be editable, and others to be read-only. One solution would be to provide, in advance, the cells that should and should not be editable. To accomplish this using delegation, you would simply add a delegate to your tag, say `should_allow_edit` this would be filled in with a function provided by the user of your table. When the user tried to click on the cell to edit it, you would then call the delegate provided with the cell information (x,y, etc.) and either allow edit or not based on whether that function returned true or false. The decision to allow editing or not has been *delegated* to something that is better suited to make that decision.

This delegation type of arrangement allows for massive flexibility with very little cost to the developer. It also removes the need for subclassing or multiple versions of the same widget when the differences can be framed in terms of modifying the original behavior, which is most of the time.
