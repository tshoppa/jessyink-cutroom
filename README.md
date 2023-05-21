# jessyink-cutroom
Jessyink cutroom is a visual editor to rearrange the order of views and effects in presentations build with jessyink.

Here is a running version of [cutroom](https://tshoppa.github.io/jessyink-cutroom/).

Jessyink is a build in extension of [inkscape](https://inkscape.org). It allows to create pan and zoom presentations like [this example](https://tshoppa.github.io/jessyink-cutroom/files/JessyInkDemo.svg) (please use arrows left and right to navigate, mouse navigation was disabled to enable links).

Jessyink's interface is limited to a bunch of dialogs to enter order and properties of views and effects, which is totally fine for the first setup. However, inserting steps or changing the order afterwards is really anoying, as you have to update the order number of all successive steps with each change (often ending in getting lost and reworking all steps from the beginning).

[Jessyink cutroom](https://tshoppa.github.io/jessyink-cutroom/) provides a visual timeline of a presentation's views and effects and an easy drag and drop editor for rearrangement. For each step, the actual presentation view will be displayed in a preview window. 

The app is client only, everything is processed in the frontend html/javascript.

# Update
Cutroom got some new features:
- Editable duration and transition type for effects and views
- **Exclusive: Animation easing** 30 algorithms to make animation timing more natural, dynamic or fancy
- **Exclusive: Real "Pop" effect** Pop effect was kind of broken in jessyink, now objects really pop up if the effect is applied! 

[Watch the demo!](https://tshoppa.github.io/jessyink-cutroom/files/NewFeaturesDemo.svg)
