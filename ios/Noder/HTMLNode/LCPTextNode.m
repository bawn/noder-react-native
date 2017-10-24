//
//  LCPTextNode.m
//  Test
//
//  Created by bawn on 27/03/2017.
//  Copyright © 2017 bawn. All rights reserved.
//

#import "LCPTextNode.h"

static NSString *const kLinkAttributeName = @"kLinkAttributeName";
//static NSString *const kLinkAttributeName = @"kLinkAttributeName";

@implementation LCPTextNode


- (instancetype)init{
    self = [super init];
    if (self) {
        self.linkAttributeNames = @[kLinkAttributeName];
        self.userInteractionEnabled = YES;
    }
    return self;
}


- (void)didLoad{
    self.layer.as_allowsHighlightDrawing = YES;
    [super didLoad];
}


@end
