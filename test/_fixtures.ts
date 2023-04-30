const trim = (text: TemplateStringsArray) =>
  text[0].replace(/^[\n]{1}/, '').replace(/[\n]{1}$/, '');

export const textWithTabs = trim`
aaa	aa	a	aaaa	
`;

export const textWithSpaces = trim`
aaa aa  a   aaaa    
`;

export const longSubjectRaw = trim`
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas blandit lacinia massa sit amet sollicitudin.
`;

export const longSubjectFormatted = trim`
Lorem ipsum dolor sit amet, consectetur adipiscing

elit. Maecenas blandit lacinia massa sit amet sollicitudin.
`;

export const shortSubjectRaw = trim`
Lorem ipsum

dolor sit amet, consectetur adipiscing elit.
`;

export const truncateSubjectRaw = trim`
Lorem ipsum dolor sit amet, consectetur adipiscing elit.
`;

export const truncateSubjectWrapped = trim`
Lorem ipsum dolor sit amet, consectetur adipiscing
elit.
`;

export const indentWithTabsRaw = trim`
Lorem ipsum

		Nullam et lacus aliquet, imperdiet dui vitae, tempor turpis. Cras consequat sed tellus ut pharetra. Nam malesuada odio at ligula imperdiet, sed porta mi rutrum.
`;

export const indentWithTabsWrapped = trim`
Lorem ipsum

		Nullam et lacus aliquet, imperdiet dui vitae, tempor turpis.
		Cras consequat sed tellus ut pharetra. Nam malesuada odio at
		ligula imperdiet, sed porta mi rutrum.
`;

export const indentWithSpacesRaw = trim`
Lorem ipsum

    Nullam et lacus aliquet, imperdiet dui vitae, tempor turpis. Cras consequat sed tellus ut pharetra. Nam malesuada odio at ligula imperdiet, sed porta mi rutrum.
`;

export const listDecimalTabsRaw = trim`
Lorem ipsum

	1.	Nullam et lacus aliquet, imperdiet dui vitae, tempor turpis. Cras consequat sed tellus ut pharetra. Nam malesuada odio at ligula imperdiet, sed porta mi rutrum.
`;

export const listDecimalTabsWrapped = trim`
Lorem ipsum

	1.	Nullam et lacus aliquet, imperdiet dui vitae, tempor turpis.
		Cras consequat sed tellus ut pharetra. Nam malesuada odio at
		ligula imperdiet, sed porta mi rutrum.
`;

export const listAlphaTabsRaw = trim`
Lorem ipsum

	a.	Nullam et lacus aliquet, imperdiet dui vitae, tempor turpis. Cras consequat sed tellus ut pharetra. Nam malesuada odio at ligula imperdiet, sed porta mi rutrum.
`;

export const listAlphaTabsWrapped = trim`
Lorem ipsum

	a.	Nullam et lacus aliquet, imperdiet dui vitae, tempor turpis.
		Cras consequat sed tellus ut pharetra. Nam malesuada odio at
		ligula imperdiet, sed porta mi rutrum.
`;

export const listAlphaBraketTabsRaw = trim`
Lorem ipsum

	a.)	Nullam et lacus aliquet, imperdiet dui vitae, tempor turpis. Cras consequat sed tellus ut pharetra. Nam malesuada odio at ligula imperdiet, sed porta mi rutrum.
`;

export const listAlphaBraketTabsWrapped = trim`
Lorem ipsum

	a.)	Nullam et lacus aliquet, imperdiet dui vitae, tempor turpis.
		Cras consequat sed tellus ut pharetra. Nam malesuada odio
		at ligula imperdiet, sed porta mi rutrum.
`;

export const listAsteriskTabsRaw = trim`
Lorem ipsum

	*	Nullam et lacus aliquet, imperdiet dui vitae, tempor turpis. Cras consequat sed tellus ut pharetra. Nam malesuada odio at ligula imperdiet, sed porta mi rutrum.
`;

export const listAsteriskTabsWrapped = trim`
Lorem ipsum

	*	Nullam et lacus aliquet, imperdiet dui vitae, tempor turpis.
		Cras consequat sed tellus ut pharetra. Nam malesuada odio at
		ligula imperdiet, sed porta mi rutrum.
`;

export const listDashTabsRaw = trim`
Lorem ipsum

	-	Nullam et lacus aliquet, imperdiet dui vitae, tempor turpis. Cras consequat sed tellus ut pharetra. Nam malesuada odio at ligula imperdiet, sed porta mi rutrum.
`;

export const listDashTabsWrapped = trim`
Lorem ipsum

	-	Nullam et lacus aliquet, imperdiet dui vitae, tempor turpis.
		Cras consequat sed tellus ut pharetra. Nam malesuada odio at
		ligula imperdiet, sed porta mi rutrum.
`;

export const todo = trim`
In dignissim non eros at iaculis. Cras et luctus

    1.  In dignissim non eros at iaculis. Cras et luctus tortor, nec tincidunt nisl. Vivamus vitae porta ex. Nam congue pharetra massa in varius. Phasellus ornare odio ac cursus tincidunt.   
    
    2.  In dignissim non eros at iaculis. Cras et luctus tortor, nec tincidunt nisl. Vivamus vitae porta ex. Nam congue pharetra massa in varius. Phasellus ornare odio ac cursus tincidunt.
`;

export const todo2 = trim`
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae rhoncus leo. Aenean viverra commodo ipsum, ut commodo tellus tempus id. Quisque pretium faucibus augue maximus fermentum. Nam ornare nibh nec convallis tristique. Proin pharetra ex a felis ullamcorper hendrerit. Aenean sodales purus ante, et iaculis urna finibus vitae. Suspendisse id imperdiet ipsum. Donec tempus sapien id ultricies rhoncus. Nulla dapibus purus vel quam pharetra, mattis consectetur sem egestas. Etiam lobortis libero at ante molestie, a luctus dolor volutpat.
1.) Pellentesque ac enim massa. Ut consequat, arcu ut dignissim vehicula, ligula turpis imperdiet lorem, vitae consectetur nunc erat eleifend risus. Nullam id consequat felis, ultricies varius est.
2.) Pellentesque ac enim massa. Ut consequat, arcu ut dignissim vehicula, ligula turpis imperdiet lorem, vitae consectetur nunc erat eleifend risus. Nullam id consequat felis, ultricies varius est.
`;

export const todo2Expected = trim`
Lorem ipsum dolor sit amet, consectetur adipiscing

elit. Donec vitae rhoncus leo. Aenean viverra commodo ipsum, ut commodo
tellus tempus id. Quisque pretium faucibus augue maximus fermentum. Nam
ornare nibh nec convallis tristique. Proin pharetra ex a felis
ullamcorper hendrerit. Aenean sodales purus ante, et iaculis urna
finibus vitae. Suspendisse id imperdiet ipsum. Donec tempus sapien id
ultricies rhoncus. Nulla dapibus purus vel quam pharetra, mattis
consectetur sem egestas. Etiam lobortis libero at ante molestie, a
luctus dolor volutpat.
1.) Pellentesque ac enim massa. Ut consequat, arcu ut dignissim
		vehicula, ligula turpis imperdiet lorem, vitae consectetur nunc
		erat eleifend risus. Nullam id consequat felis, ultricies varius
		est.
2.) Pellentesque ac enim massa. Ut consequat, arcu ut dignissim
		vehicula, ligula turpis imperdiet lorem, vitae consectetur nunc
		erat eleifend risus. Nullam id consequat felis, ultricies varius
		est.
`;

export const todo3 = trim`
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam id dolor tempus, finibus erat ac, iaculis dolor. Donec in justo porttitor, fermentum eros quis, pharetra augue.

  1.) Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam id dolor tempus, finibus erat ac, iaculis dolor.
  2.) Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam id dolor tempus, finibus erat ac, iaculis dolor.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam id dolor tempus, finibus erat ac, iaculis dolor. Donec in justo porttitor, fermentum eros quis, pharetra augue.
`;

export const todo3Expected = trim`
Lorem ipsum dolor sit amet, consectetur adipiscing

elit. Etiam id dolor tempus, finibus erat ac, iaculis dolor. Donec in
justo porttitor, fermentum eros quis, pharetra augue.

  1.) Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam id
      dolor tempus, finibus erat ac, iaculis dolor.
  2.) Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam id
      dolor tempus, finibus erat ac, iaculis dolor.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam id dolor
tempus, finibus erat ac, iaculis dolor. Donec in justo porttitor,
fermentum eros quis, pharetra augue.
`;

export const finalNewlineInserted = trim`
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna ipsum.\n
`;

export const finalNewlineInsertedWrapped = trim`
Lorem ipsum dolor sit amet, consectetur adipiscing

elit. Donec magna ipsum.\n
`;
